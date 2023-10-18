import jsPDF from "jspdf";
import { useRef } from "react";
import html2canvas from "html2canvas";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Logo from "../assets/logo.png";
import Loading from "../components/Loading";
import NotFound from "../components/NotFound";
import { useFetchOrderQuery } from "../store/slices/apiSlice";

const Invoice = () => {
  const pdfRef = useRef();
  const params = useParams();
  const {
    data: order,
    isLoading,
    isError,
  } = useFetchOrderQuery(params.order_id);
  const { user } = useSelector((state) => state.user);

  const downloadInvoice = () => {
    const input = pdfRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4", true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;
      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );
      pdf.save("invoice.pdf");
    });
  };

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex flex-col items-center justify-center p-24">
        <Loading />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-screen h-screen flex flex-col items-center justify-center p-24">
        <NotFound />
      </div>
    );
  }

  return (
    <div className="w-screen h-screen p-24">
      <div
        ref={pdfRef}
        className="w-full h-full flex flex-col items-center justify-between space-y-5 p-10">
        {/* Header */}
        <div className="w-full flex flex-row items-center justify-between p-5 bg-gray-200 rounded-lg">
          <p className="text-3xl font-bold">Food App</p>
          <img src={Logo} alt="logo" className="w-20 h-20" />
          <div className="flex flex-col items-end justify-center">
            <p>
              <b>Address: </b>Johar Town, R Block
            </p>
            <p>
              <b>Phone: </b>+92-326-8860405
            </p>
            <p>
              <b>Email: </b>mohdmushood@yahoo.com
            </p>
          </div>
        </div>
        {/* Customer Details */}
        <div className="w-full flex flex-row items-center justify-between p-5 bg-gray-200 rounded-lg">
          <div className="flex flex-col items-start justify-center">
            <p>
              <b>Customer Name: </b>
              {user.username}
            </p>
            <p>
              <b>Customer Email: </b>
              {user.email}
            </p>
          </div>
          <div className="flex flex-col items-end justify-center">
            <p>
              <b>Order ID: </b>
              {params.order_id}
            </p>
            <p>
              <b>Customer ID: </b>
              {user.ID}
            </p>
            <p>
              <b>Date: </b>
              {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
        {/* Table */}
        {order.length !== 0 ? (
          <div className="w-full p-5 bg-gray-200 rounded-lg">
            <table className="w-full text-sm text-left text-gray-400">
              <thead className="text-xs uppercase bg-gray-700 text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Quantity
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {order.order_items.map((item) => (
                  <tr
                    key={item.item.ID}
                    className="border-b bg-gray-800 border-gray-700">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium whitespace-nowrap text-white">
                      {item.item.name}
                    </th>
                    <td className="px-6 py-4">{item.quantity}</td>
                    <td className="px-6 py-4">Rs. {item.item.price}</td>
                    <td className="px-6 py-4">
                      Rs. {parseInt(item.quantity) * parseInt(item.item.price)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <NotFound />
        )}
        {/* Footer */}
        <div className="w-full flex flex-row items-center justify-between p-5 bg-gray-200 rounded-lg">
          <p className="text-md flex-1">
            <b>Thankyou for Shopping with Us!</b>
          </p>
          <div className="text-xl flex flex-col items-end justify-center">
            <p>
              <b>Grand Total: </b>
              Rs. {order.total}
            </p>
          </div>
        </div>
      </div>
      <div className="w-full flex items-center justify-center">
        <button
          type="button"
          onClick={downloadInvoice}
          className="px-3 py-2 text-black font-semibold bg-yellow-500 rounded-lg">
          Download Invoice
        </button>
      </div>
    </div>
  );
};

export default Invoice;
