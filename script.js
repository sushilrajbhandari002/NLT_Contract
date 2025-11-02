// Event-wise prices
const eventPrices = {
    "Haldi & Mehendi": 15000,
    "Marriage Day": 45000,
    "Reception Day": 25000,
    "Pre-Wedding Shoot Short Distance": 15000,
    "Pre-Wedding Shoot Long Distance": 30000,
    "Post-Wedding Shoot Short Distance": 25000,
    "Post-Wedding Shoot Long Distance": 50000
  };
  
  // Main packages prices
  const packagePrices = {
    "Bride Side Package": 65000,
    "Groom Side Package": 85000,
    "Both Side Package": 120000,
    "Premium Package Short Distance": 135000,
    "Premium Package Long Distance": 145000
  };
  
  function generateContract() {
    const clientName = document.getElementById('clientName').value;
    const clientAddress = document.getElementById('clientAddress').value;
    const clientContact = document.getElementById('clientContact').value;
    const mainPackage = document.getElementById('mainPackage').value;
    const advancePayment = parseInt(document.getElementById('advancePayment').value) || 0;
    const paymentMethod = document.getElementById('paymentMethod').value;
    const additionalNotes = document.getElementById('additionalNotes').value;
  
    // Collect selected events and dates
    const eventCheckboxes = document.querySelectorAll('#eventSelection input[type="checkbox"]');
    const eventDates = document.querySelectorAll('#eventSelection .eventDate');
  
    let selectedEvents = [];
    let totalPrice = 0;
  
    eventCheckboxes.forEach((checkbox, index) => {
      if (checkbox.checked) {
        let eventName = checkbox.value;
        let date = eventDates[index].value;
        selectedEvents.push(`${eventName} - Date: ${date}`);
  
        // Add price for each event
        if (eventName === "Pre-Wedding Shoot" || eventName === "Post-Wedding Shoot") {
          // Assume short distance by default
          totalPrice += eventPrices[`${eventName} Short Distance`];
        } else {
          totalPrice += eventPrices[eventName];
        }
      }
    });
  
    // Add main package price
    if (mainPackage === "Premium Package") {
      totalPrice += packagePrices["Premium Package Short Distance"]; // default short distance
    } else {
      totalPrice += packagePrices[mainPackage];
    }
  
    const remainingBalance = totalPrice - advancePayment;
  
    const contractText = `
  NLT Productions
  Wedding Photography & Videography Agreement
  
  This Agreement is made on ${new Date().toLocaleDateString()} between:
  
  Client: ${clientName}
  Address: ${clientAddress}
  Phone/Email: ${clientContact}
  
  Service Provider: NLT Productions
  Address: [Your Address]
  Phone/Email: [Your Contact Info]
  
  1. Services Provided
  
  NLT Productions agrees to provide the following services for the wedding of ${clientName}:
  
  Photography coverage: [Candid, Portrait, Rituals, Drone, Pre/Post Wedding, Family & Guest Interaction]
  Videography coverage: [Cinematic Film, Highlight, Teaser, Drone, Rituals, Social Media Reels]
  Editing and delivery of photos and videos
  Delivery format: [USB, Online Link, Physical Album, etc.]
  
  2. Event Details
  Selected Events and Dates:
  ${selectedEvents.join('\n')}
  
  3. Payment Terms
  
  Total Package Cost: Rs. ${totalPrice.toLocaleString()}
  Advance Payment: Rs. ${advancePayment.toLocaleString()} due on signing this agreement
  Remaining Balance: Rs. ${remainingBalance.toLocaleString()} due on event day
  Payment Method: ${paymentMethod}
  
  4. Client Responsibilities
  
  Provide all necessary details of events, schedule, and locations.
  Ensure guests and family members cooperate for photography/videography.
  
  5. Delivery Timeline
  
  Photos delivered within [X weeks]
  Videos delivered within [X weeks]
  Any delay due to unforeseen circumstances will be communicated in advance.
  
  6. Usage & Copyright
  
  NLT Productions retains copyright of all photos and videos.
  Client may use images/videos for personal use.
  NLT Productions may use photos/videos for portfolio, marketing, or social media, unless otherwise agreed.
  
  7. Cancellation & Refund
  
  If the client cancels [X days] before the event, the advance payment is non-refundable.
  NLT Productions may cancel only under unavoidable circumstances, and the client will be refunded any payments made.
  
  8. Agreement Acceptance
  
  By signing below, both parties agree to the terms outlined above.
  
  Client Signature: _____________________  Date: _______
  NLT Productions Signature: _______________ Date: _______
  
  Additional Notes: ${additionalNotes}
  `;
  
    document.getElementById('contractContent').textContent = contractText;
  }
  
  // Multi-page PDF download
  function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit: 'pt', format: 'a4' });
    const content = document.getElementById('contractContent').textContent;
  
    doc.setFont("times", "normal");
    doc.setFontSize(12);
  
    const pageWidth = doc.internal.pageSize.getWidth() - 40;
    const pageHeight = doc.internal.pageSize.getHeight() - 40;
    const lines = doc.splitTextToSize(content, pageWidth);
  
    let cursorY = 40;
    lines.forEach(line => {
      if (cursorY > pageHeight) {
        doc.addPage();
        cursorY = 40;
      }
      doc.text(line, 20, cursorY);
      cursorY += 14; // line height
    });
  
    doc.save("Wedding_Agreement.pdf");
  }
  