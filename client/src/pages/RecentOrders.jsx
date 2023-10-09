import Logo from "../assets/logo.jpg";
// import Loading from "../components/Loading";
// import NotFound from "../components/NotFound";
import OrderCard from "../components/Order/OrderCard";
// import { useGetUserOrdersQuery } from "../store/slices/apiSlice";

const RecentOrders = () => {
  const orderItems = [
    {
      user_id: 1,
      order_id: 1,
      order_items: [
        {
          item_id: 1,
          name: "Mighty Zinger",
          image: Logo,
          price: 700,
          quantity: 2,
        },
        {
          item_id: 2,
          name: "Biryani",
          image: Logo,
          price: 270,
          quantity: 2,
        },
        {
          item_id: 3,
          name: "Krunch Burger",
          image: Logo,
          price: 400,
          quantity: 2,
        },
      ],
      created_at: new Date().toLocaleDateString(),
    },
    {
      user_id: 1,
      order_id: 2,
      order_items: [
        {
          item_id: 1,
          name: "Mighty Zinger",
          image: Logo,
          price: 700,
          quantity: 2,
        },
        {
          item_id: 2,
          name: "Biryani",
          image: Logo,
          price: 270,
          quantity: 2,
        },
      ],
      created_at: new Date().toLocaleDateString(),
    },
    {
      user_id: 1,
      order_id: 3,
      order_items: [
        {
          item_id: 1,
          name: "Mighty Zinger",
          image: Logo,
          price: 700,
          quantity: 2,
        },
        {
          item_id: 2,
          name: "Biryani",
          image: Logo,
          price: 270,
          quantity: 2,
        },
        {
          item_id: 3,
          name: "Krunch Burger",
          image: Logo,
          price: 400,
          quantity: 2,
        },
      ],
      created_at: new Date().toLocaleDateString(),
    },
    {
      user_id: 1,
      order_id: 4,
      order_items: [
        {
          item_id: 1,
          name: "Mighty Zinger",
          image: Logo,
          price: 700,
          quantity: 2,
        },
        {
          item_id: 2,
          name: "Biryani",
          image: Logo,
          price: 270,
          quantity: 2,
        },
      ],
      created_at: new Date().toLocaleDateString(),
    },
  ];

  // const { data, isLoading, isError } = useGetUserOrdersQuery(user.ID);

  // if (!isLoading) {
  //   console.log(JSON.stringify(data.data, null, 2));
  // }

  // if (isLoading) {
  //   return <Loading />;
  // }

  // if (isError || data.data.length === 0) {
  //   return <NotFound message="No Orders Found!" />;
  // }

  // if (data.data.length !== 0) {
  //   return <div>RecentOrders</div>;
  // }

  return (
    <div className="w-screen h-screen p-10 grid grid-cols-4 gap-5 items-center justify-center">
      {/* Card */}
      {orderItems.map((order) => (
        <OrderCard key={order.order_id} order={order} />
      ))}
    </div>
  );
};

export default RecentOrders;
