let c = 0; // current image 
let a = 4; //all image count
let degree = 0;

/* card bg */
let c1 = document.getElementById("c1");
let c2 = document.getElementById("c2");
let c3 = document.getElementById("c3");
let c4 = document.getElementById("c4");
let nx = document.getElementById("nx");

/* card image */
let q0 = document.getElementById("q0");
let q1 = document.getElementById("q1");
let q2 = document.getElementById("q2");
let q3 = document.getElementById("q3");

/* other classes */
let spin = document.querySelector(".main");
let dots = document.querySelectorAll(".dots a");
let item = document.getElementById("item");

/* Functions */
function next() {
  document.getElementById("cd-next").disabled = true;
  setTimeout(() => document.getElementById("cd-next").disabled = false, 1000);

  const nextIndex = (c + 1) % a;

  degree -= 90;
  spin.style.transform = `rotate(${degree}deg)`; 

  check_rotation();
  c+1;
     dot(nextIndex + 1);
  c = nextIndex; 
  $( ".active" ).effect( "slide", {direction: "left"}, 700);

}

function prev() {
  document.getElementById("cd-prev").disabled = true;
  setTimeout(() => document.getElementById("cd-prev").disabled = false, 1000);

  const prevIndex = (c + a - 1) % a;

  degree += 90;
  spin.style.transform = `rotate(${degree}deg)`; 

  check_rotation();
  dot(prevIndex + 1);
  c = prevIndex;
  $( ".active" ).effect( "slide", {direction: "right"}, 700);
}

function deg_180() {
  document.getElementById("res" + (c + 1)).classList.remove("active");
  c = (a + c + 2) % a; // after 3 image a = 0
  document.getElementById("res" + (c + 1)).classList.add("active");


  degree += 180;
  spin.style.transform = `rotate(${degree}deg)`; 
  
  check_rotation();
  dot(c+1);
  $( ".active" ).effect( "slide", {direction: "right"}, 700);
}

 function check_rotation() {
  let elements = [q0, q1, q2, q3];

  for (let i = 0; i < elements.length; i++) {
    
    elements[i].style.transition = 'transform 1.2s ease-in'; 
    new_degree = degree-45;
    count_degree = (new_degree/45)-1;
    
    
    if(count_degree % 4 == 0){
      elements.forEach((element) => {
        element.style.transform = `rotate(${new_degree+180}deg)`;
        console.log("ters derece: " +(new_degree));
      });
    }else{
      
    elements.forEach((element) => {
      element.style.transform = `rotate(${new_degree}deg)`;
        console.log("düz derece: " +(new_degree));
    });
    }
  }
} 

function dot(current_num) {
  const num_elements = document.querySelectorAll(".dots a").length;
  const active_num = current_num < 1 ? num_elements : current_num > num_elements ? 1 : current_num;

  dots.forEach(function(dot) {
    dot.style.opacity = ".5";
  });

  document.querySelector(".dots a:nth-child("+active_num+")").style.opacity = "1";
  document.getElementById("res" + active_num).classList.add("active");

  for (let i = 1; i <= 4; i++) {
    let element1 = document.getElementById("res" + (active_num + i));
    let element2 = document.getElementById("res" + (active_num - i));
    if (element1) {
      element1.classList.remove("active");  
    }
    if (element2) {
      element2.classList.remove("active");
    }
  } 

}

function handleDotClick(event) {
  const dotIndex = Array.from(event.currentTarget.parentElement.children).indexOf(event.currentTarget);
  console.log(dotIndex);

  if (dotIndex === c) {
    return; 
  } else if (dotIndex == c - 1 || dotIndex == c + 3) {
    prev();
  } else if (dotIndex == c + 1 || dotIndex == c - 3) {
    next();
  } else if (dotIndex == c + 2 || dotIndex == c - 2 ){
    deg_180();
  }
}

function push_position(num){
  let offset_value = $('.c'+num).offset().top;
  let offset_value_left = $('.c'+num).offset().left;


  if(offset_value < 55){ 
    prev();
  }
  else if(offset_value > 120){
    next();
  }
   else if(offset_value > 100 && offset_value < 110){
    if(offset_value_left < 200){ 
      deg_180();
    }
    else{
      return; 
    }
  } 
} 


dots.forEach(dot => dot.addEventListener("click", handleDotClick));
check_rotation();

