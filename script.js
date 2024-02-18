document.addEventListener('DOMContentLoaded', function() {
    let selectedSeats = 0;
    const seatPrice = 550;
    const selectedSeatNumbers = [];
  
    // Function to handle seat reservation
    function reserveSeat() {
      const seat = this;
      const totalSeatsElement = document.getElementById('total-seats');
      const totalPriceElement = document.getElementById('total-price');
      const seatCountElement = document.getElementById('seat-count');
  
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
  
      const grandTotalElement = document.getElementById('grand-total');
  
      // Update grand total initially to match total price
      grandTotalElement.textContent = totalPriceElement.textContent;
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
  