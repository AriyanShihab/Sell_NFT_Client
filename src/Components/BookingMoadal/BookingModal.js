import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { UserContext } from "../../Context/Auth/AuthContext";
import Loading from "../Loader/Loading";

const BookingModal = ({ setCurrentProduct, product }) => {
  const { user } = useContext(UserContext);

  const [bookingLoading, setBookingLoading] = useState(false);
  const handelBooking = (event) => {
    event.preventDefault();
    const productId = product._id;
    fetch(`http://localhost:5000/product/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        const bookedProduct = data;
        bookedProduct.buyerEmail = user?.email;
        delete bookedProduct._id;
        fetch(`http://localhost:5000/bookings`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(bookedProduct),
        })
          .then((res) => res.json())
          .then((bookedData) => {
            if (bookedData.acknowledged) {
              toast.success("Booking Added");
            }
          })
          .catch((err) => {
            toast.error(err.message);
            setBookingLoading(false);
          });
      })
      .catch((err) => {
        toast.error(err.message);
        setBookingLoading(false);
      });

    setCurrentProduct(null);
  };

  return (
    <div>
      <input type="checkbox" id="bookingModal" className="modal-toggle" />
      <div className="modal ">
        <div className="modal-box">
          <form onSubmit={handelBooking} className="grid gap-y-2">
            <input
              className="styledInput"
              type="text"
              defaultValue={user?.displayName}
              disabled
            />
            <input
              className="styledInput"
              type="email"
              defaultValue={user?.email}
              disabled
            />
            <input
              className="styledInput"
              type="text"
              defaultValue={product.name}
              disabled
            />
            <input
              className="styledInput"
              type="number"
              defaultValue={product.sellingPrice}
              disabled
            />
            <input
              className="styledInput"
              type="number"
              placeholder="your Contact Number"
              required
            />
            <input
              className="styledInput"
              type="text"
              placeholder="your Meeting Location"
              required
            />

            <button type="submit" className="myBtn mt-3 w-full">
              {bookingLoading ? <Loading></Loading> : "Book Now"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
