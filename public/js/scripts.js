//Back to top button
let mybutton = document.getElementById("btn-back-to-top");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (
    document.body.scrollTop > 20 ||
    document.documentElement.scrollTop > 20
  ) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}
// When the user clicks on the button, scroll to the top of the document
mybutton.addEventListener("click", backToTop);

function backToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

document.getElementById("year").innerHTML = new Date().getFullYear();

// datePickerId.value = new Date().toISOString().split("T")[0];


var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}



var lazyanalisis=!1;window.addEventListener("scroll",function(){(0!=document.documentElement.scrollTop&&!1===lazyanalisis||0!=document.body.scrollTop&&!1===lazyanalisis)&&(!function(){var e=document.createElement("script");e.type="text/javascript",e.async=!0,e.src="https://www.googletagmanager.com/gtag/js?id=G-R4WJ8EYWDD";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(e,a)}(),lazyanalisis=!0)},!0);
//]]></script>

  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-R4WJ8EYWDD');

    <style>
/* Fade-in Animation */
@keyframes fadeInPopup {
    from { opacity: 0; transform: scale(0.9); }
    to { opacity: 1; transform: scale(1); }
}
</style>

<script>
document.addEventListener("DOMContentLoaded", function () {
    
    // Popup Overlay
    let overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.background = "rgba(0,0,0,0.75)";
    overlay.style.display = "flex";
    overlay.style.alignItems = "center";
    overlay.style.justifyContent = "center";
    overlay.style.zIndex = "999999";
    overlay.style.animation = "fadeInPopup .4s ease-out";

    // Clickable Banner (whole box is a link)
    let link = document.createElement("a");
    link.href = "https://windrawtips.com/";
    link.target = "_blank";
    link.style.textDecoration = "none";
    link.style.width = "90%";
    link.style.maxWidth = "430px";

    // Popup Box
    let box = document.createElement("div");
    box.style.background = "linear-gradient(135deg, #009444, #00B65F)";
    box.style.padding = "30px 25px";
    box.style.borderRadius = "16px";
    box.style.color = "white";
    box.style.textAlign = "center";
    box.style.fontFamily = "Arial, sans-serif";
    box.style.boxShadow = "0 12px 35px rgba(0,0,0,0.4)";
    box.style.cursor = "pointer";
    box.style.animation = "fadeInPopup .4s ease-out";

    box.innerHTML = `
        <h2 style="margin:0 0 10px; font-size:26px; font-weight:bold;">
            Best Prediction Site
        </h2>

        <p style="margin:0; font-size:18px;">
            Get accurate tips, sure wins & daily jackpots.
        </p>

        <p style="margin:8px 0 18px; font-size:17px;">
            Powered by <strong style="color:#FFD700;">WINDRAWTIPS</strong>
        </p>

        <div style="
            background:white;
            color:#009444;
            padding:12px;
            border-radius:8px;
            font-size:18px;
            font-weight:bold;
            margin-top:15px;
        ">
             Visit WindrawTips Now 
        </div>
    `;

    link.appendChild(box);
    overlay.appendChild(link);
    document.body.appendChild(overlay);

    // Close popup when clicking outside
    overlay.addEventListener("click", function (e) {
        if (e.target === overlay) {
            overlay.remove();
        }
    });

});
</script>
