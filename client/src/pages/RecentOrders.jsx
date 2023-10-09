import { useSelector } from "react-redux";

import Loading from "../components/Loading";
import NotFound from "../components/NotFound";
import OrderCard from "../components/Order/OrderCard";
import { useGetUserOrdersQuery } from "../store/slices/apiSlice";

const RecentOrders = () => {
  const { user } = useSelector((state) => state.user);
  const { data: orders, isLoading, isError } = useGetUserOrdersQuery(user.ID);

  if (isLoading) {
    return (
      <div className="w-screen h-screen p-10 flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (isError || orders.data.length === 0) {
    return (
      <div className="w-screen h-screen p-10 flex items-center justify-center">
        <NotFound message="No Orders Found!" />
      </div>
    );
  }

  if (orders.data.length !== 0) {
    return (
      <div className="w-screen h-screen p-10 grid grid-cols-4 gap-5 items-center justify-center">
        {/* Card */}
        {orders.data.map((order) => (
          <OrderCard key={order.ID} order={order} />
        ))}
      </div>
    );
  }
};

export default RecentOrders;
