import React from "react";

const BookingModal = () => {
  /**
   * On clicking the Book now button, a form in a modal will popup with the logged-in user name and email address, item name, and price(item name, price, and user information will not be editable) by default. You will give your phone number and meeting location, and lastly, there will be a submit button. After clicking the submit button, you will have to inform the buyer with a modal/toast that the item is booked.
   */
  return (
    <div>
      <input type="checkbox" id="bookingModal" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Congratulations random Internet user!
          </h3>
          <p className="py-4">
            You've been selected for a chance to get one year of subscription to
            use Wikipedia for free!
          </p>
          <div className="modal-action">
            <label htmlFor="bookingModal" className="btn">
              Yay!
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
