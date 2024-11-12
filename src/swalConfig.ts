export function addCssToSwal() {
  const style = document.createElement("style");

  // Custom SweetAlert Styling
style.innerHTML = `
  .custom-swal-popup {
    width: 300px;             /* Smaller width for less intrusive popup */
    font-size: 16px;
    background: #98fb98;
    color: #333333;
  }

  .custom-swal-error {
    width: 300px;             /* Smaller width for less intrusive popup */
    font-size: 16px;
    background: #ff6347;
    color: #000000;
  }
`;

  document.head.appendChild(style);
}
