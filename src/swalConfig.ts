export function addCssToSwal() {
  const style = document.createElement("style");

  // Custom SweetAlert Styling
  style.innerHTML = `
    .custom-swal-popup {
         width: 500px;             /* Smaller width for less intrusive popup */
    font-size: 16px;
    background: #98fb98;
    color: #333333
;
  
}


  `;
  document.head.appendChild(style);
}
