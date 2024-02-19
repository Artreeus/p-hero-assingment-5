document.addEventListener('DOMContentLoaded', function () {
  let selectedSeats = 0;
  const seatPrice = 550;
  const selectedSeatNumbers = [];
  const seatInfoContainer = document.getElementById('fare-info-container');

  // Function to handle seat reservation
  function reserveSeat() {
      const seat = this;
      const totalSeatsElement = document.getElementById('total-seats');
      const totalPriceElement = document.getElementById('total-price');
      const seatCountElement = document.getElementById('seat-count');
      const grandTotalElement = document.getElementById('grand-total');

      // Clear existing seat information
      seatInfoContainer.innerHTML = '';

      if (seat.classList.contains('selected')) {
          // Seat is already selected, remove selection
          seat.classList.remove('selected');
          selectedSeats--;

          // Reduce the price when deselecting a seat
          totalPriceElement.textContent = parseInt(totalPriceElement.textContent) - seatPrice;

          // Remove the seat number from the selectedSeatNumbers array
          const seatNumber = parseInt(seat.getAttribute('data-seat-number'));
          const index = selectedSeatNumbers.indexOf(seatNumber);
          if (index !== -1) {
              selectedSeatNumbers.splice(index, 1);
              updateSeatNumber();
          }
      } else if (selectedSeats < 4) {
          // Select the seat if the user has not selected 4 seats yet
          seat.classList.add('selected');
          selectedSeats++;

          // Add the price when selecting a seat
          totalPriceElement.textContent = parseInt(totalPriceElement.textContent) + seatPrice;

          // Add the seat number to the selectedSeatNumbers array
          const seatNumber = parseInt(seat.getAttribute('data-seat-number'));
          selectedSeatNumbers.push(seatNumber);
          updateSeatNumber();
      }

      // Update total seats
      totalSeatsElement.textContent = 8 - selectedSeats;

      // Update the seat count element
      seatCountElement.textContent = selectedSeats;

      // Update grand total to match total price
      grandTotalElement.textContent = totalPriceElement.textContent;

      // Update seat information dynamically based on the selected seats
      for (const seatNumber of selectedSeatNumbers) {
          const seatSpan = document.querySelector(`button[data-seat-number="${seatNumber}"] span`);
          const fareInfoHTML = `
              <div class="flex justify-around fare-text">
                  <div>${seatSpan.textContent}</div>
                  <div>Economy</div>
                  <div>${seatPrice}</div>
              </div>
          `;
          seatInfoContainer.innerHTML += fareInfoHTML;
      }
  }

  // Function to update the seat number button
  function updateSeatNumber() {
      const seatNumberButton = document.getElementById("total-seats");
      seatNumberButton.textContent = selectedSeatNumbers.length;
  }

  // Get all seats by class name and add event listeners for seat reservation
  var seats = document.querySelectorAll('.seat');

  for (let i = 0; i < seats.length; i++) {
      seats[i].addEventListener("click", reserveSeat);
      seats[i].setAttribute("data-seat-number", i + 1); // Set seat numbers
  }
});
function applyCoupon() {
  const couponInput = document.getElementById('coupon');
  const grandTotalElement = document.getElementById('grand-total');

  // Get the current total price
  const totalPrice = parseFloat(document.getElementById('total-price').innerText);

  // Check the entered coupon code and calculate the discounted price accordingly
  let discountedPrice = totalPrice;

  switch (couponCode) {
      case 'New15':
          // Apply 15% discount for 'new15'
          discountedPrice = totalPrice * 0.85;
          break;
      case 'Couple 20':
          // Apply 20% discount for 'couple20'
          discountedPrice = totalPrice * 0.8;
          break;
      default:
          alert('Invalid coupon code. Please enter the correct code.');
          return; // Exit the function if the coupon code is invalid
  }

  // Update the grand total with the discounted price
  grandTotalElement.innerText = discountedPrice.toFixed(2);

  // Disable the coupon input and button after applying the coupon
  couponInput.disabled = true;
  document.getElementById('apply-coupon').disabled = true;

  // Hide the coupon section
  document.getElementById('coupon-section').style.display = 'none';
  alert('Coupon applied successfully!');
}