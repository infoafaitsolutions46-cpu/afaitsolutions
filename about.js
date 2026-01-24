// Testimonial rotation logic
document.addEventListener("DOMContentLoaded", () => {
  const testimonials = [
    {
      text: '"AFA Solutions transformed our operations with their ERP system — seamless and efficient!"',
      author: "— Client A"
    },
    {
      text: '"Their CRM helped us manage clients and projects with clarity and control."',
      author: "— Client B"
    },
    {
      text: '"Outstanding support and innovative solutions. They truly care about client success."',
      author: "— Client C"
    },
    {
      text: '"The team delivered beyond expectations — professional, reliable, and visionary."',
      author: "— Client D"
    }
  ];

  let index = 0;
  const testimonialBox = document.getElementById("testimonial-box");
  const textElement = testimonialBox.querySelector(".testimonial-text");
  const authorElement = testimonialBox.querySelector(".testimonial-author");

  function showTestimonial(i) {
    textElement.textContent = testimonials[i].text;
    authorElement.textContent = testimonials[i].author;
  }

  // Initial testimonial
  showTestimonial(index);

  // Change testimonial every 5 seconds
  setInterval(() => {
    index = (index + 1) % testimonials.length;
    showTestimonial(index);
  }, 5000);
});
