import { useState } from "react";
import toast from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";

import Loading from "../Loading";
import CartItem from "./CartItem";
import { useSaveOrderMutation } from "../../store/slices/apiSlice";
import {
  clearOrders,
  toggleDrawer,
  setPaymentMethod,
} from "../../store/slices/orderSlice";

const CartList = () => {
  const dispatch = useDispatch();
  const [pay, setPay] = useState("cod");
  const { user } = useSelector((state) => state.user);
  const [saveOrder, { isLoading }] = useSaveOrderMutation();
  const { orderItems, total, isActive } = useSelector((state) => state.order);

  const handleClose = () => {
    dispatch(toggleDrawer());
  };

  const handlePayment = (value) => {
    setPay(value);
    dispatch(setPaymentMethod(value));
  };

  const handleOrder = async () => {
    const response = await saveOrder({
      user_id: user.ID,
      total,
      order_items: orderItems,
      payment_method: pay,
    });

    if (response.data.success) {
      dispatch(clearOrders());
      toast.success("Order Placed Successfully, Please Proceed to Payment!");

      if (pay === "card") {
        const stripe = await loadStripe(import.meta.env.VITE_STRIPE_KEY);
        let paySession = await fetch(`${import.meta.env.VITE_BASE_URL}/pay`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            products: orderItems,
            order_id: response.data.data.ID,
          }),
        });

        paySession = await paySession.json();
        const payResult = stripe.redirectToCheckout({
          sessionId: paySession.id,
        });

        if (payResult.error) {
          toast.error(payResult.error);
        }
      }
    } else {
      toast.error("Something went wrong! Please Try Again!");
    }
  };

  if (isLoading) {
    return (
      <div className="fixed top-4 right-0 z-50 w-[25%] h-[95%] shadow-xl backdrop-blur-sm bg-black/30 rounded-lg m-2 flex flex-col items-start justify-between delay-150 ease-in-out text-white overflow-y-scroll">
        <div className="flex items-center justify-center w-full h-full">
          <Loading />
        </div>
      </div>
    );
  }

  if (isActive) {
    return (
      <>
        {orderItems.length !== 0 ? (
          <div className="fixed top-4 right-0 z-50 w-[25%] h-[95%] shadow-xl backdrop-blur-sm bg-black/30 rounded-lg m-2 flex flex-col items-start justify-between delay-150 ease-in-out text-white overflow-y-scroll">
            <div className="w-full p-5 flex flex-row items-center justify-between">
              <h1 className="w-full text-3xl font-semibold">Your Cart</h1>
              <AiOutlineClose
                className="w-8 h-8 cursor-pointer"
                onClick={handleClose}
              />
            </div>
            {orderItems.length !== 0 && (
              <div className="w-full h-full p-5 flex flex-col items-center justify-center space-y-3">
                {orderItems.map((item, idx) => (
                  <CartItem key={idx} item={item} />
                ))}
                <div className="w-full text-lg font-bold flex flex-row items-center justify-between">
                  <span>Grand Total: </span>
                  <span>Rs.{total}</span>
                </div>
                <div className="w-full text-lg font-bold flex flex-row items-center justify-between space-x-3">
                  <button
                    onClick={() => handlePayment("card")}
                    className={
                      pay === "card"
                        ? "w-full bg-green-500 py-2 text-white rounded-lg font-medium"
                        : "w-full bg-white py-2 text-black rounded-lg font-medium"
                    }>
                    Card
                  </button>
                  <button
                    onClick={() => handlePayment("cod")}
                    className={
                      pay === "cod"
                        ? "w-full bg-green-500 py-2 text-white rounded-lg font-medium"
                        : "w-full bg-white py-2 text-black rounded-lg font-medium"
                    }>
                    Cash on Delivery
                  </button>
                </div>
                <button
                  type="button"
                  onClick={handleOrder}
                  className="w-full px-5 py-3 text-white font-semibold rounded-lg bg-red-600 flex flex-row items-center justify-center space-x-3">
                  <span>Checkout</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="fixed top-4 right-0 z-50 w-[25%] h-[95%] shadow-xl backdrop-blur-sm bg-black/30 rounded-lg m-2 flex flex-col items-center justify-center delay-150 ease-in-out text-white overflow-y-scroll">
            <p className="text-lg font-bold">Bhook Ni Lagi Kya ? 🥺</p>
            <AiOutlineClose
              className="w-8 h-8 cursor-pointer absolute top-3 right-3"
              onClick={handleClose}
            />
          </div>
        )}
      </>
    );
  }
};

export default CartList;
