import React, { useContext } from "react";
import { UserContext } from "../../Context/Auth/AuthContext";

const BookingModal = ({ setCurrentProduct, product }) => {
  const { user } = useContext(UserContext);
  /**
   * On clicking the Book now button, a form in a modal will popup with the logged-in user name and email address, item name, and price(item name, price, and user information will not be editable) by default. You will give your phone number and meeting location, and lastly, there will be a submit button. After clicking the submit button, you will have to inform the buyer with a modal/toast that the item is booked.
   */

  const handelBooking = (event) => {
    event.preventDefault();

    setCurrentProduct(null);
  };

  return (
    <div>
      <input type="checkbox" id="bookingModal" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
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

            <button type="submit" className="myBtn mt-3 w-full">
              Book Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
