var pictursImages = [
  'bag1',
  'banana2',
  'bathroom3',
  'boots4',
  'breakfast5',
  'bubblegum6',
  'chair7',
  'cthulhu8',
  'dog-duck9',
  'dragon11',
  'pen12',
  'pet-sweep13',
  'scissors14',
  'shark15',
  'tauntaun16',
  'unicorn18',
  'water-can19',
  'wine-glass20',
];


// Globals
var leftPicturImage = document.querySelector('#left_pictur_img');
var centerPicturImage = document.querySelector('#center_pictur_img');
var rightPicturImage = document.querySelector('#right_pictur_img');
// var groupImageSection = document.getElementById('all_picture');
var picturs = [];//an array to store all picture objects
var totalClicks = 1;
var times_showed = [];
var times_clicked = [];
var lastSeen=[];
for (var i = 0; i < pictursImages.length; i++) {
  times_showed.push(0);
  times_clicked.push(0);

}
console.log(times_showed);
console.log(times_clicked);

// leftPicturImage.src = `img/${pictursImages[0]}.jpg`;
// leftPicturImage.alt = pictursImages[0];

// centerPicturImage.src = `img/${pictursImages[1]}.jpg`;
// centerPicturImage.alt = pictursImages[1];

// rightPicturImage.src = `img/${pictursImages[2]}.jpg`;
// rightPicturImage.alt = pictursImages[2];


function Pictur(name) {
  this.name = name.split('.')[0];
  this.urlImage = `img/${this.name}.jpg`;
  this.likes=0;
  picturs.push(this);//this its refer to the object that im created
}

var leftPicturImageAT;
var centerPicturImageAT;
var rightPicturImageAT;



function pickRandomImages() {
  var leftImageRandom = picturs[randomNumber(0, picturs.length - 1)];
  var centerImageRandom = picturs[randomNumber(0, picturs.length - 1)];
  var rightImageRandom = picturs[randomNumber(0, picturs.length - 1)];
  leftPicturImage.setAttribute('src', leftImageRandom.urlImage);
  leftPicturImage.setAttribute('alt', leftImageRandom.name);
  centerPicturImage.setAttribute('src', centerImageRandom.urlImage);
  centerPicturImage.setAttribute('alt', centerImageRandom.name);
  rightPicturImage.setAttribute('src', rightImageRandom.urlImage);
  rightPicturImage.setAttribute('alt', rightImageRandom.name);
  leftPicturImageAT = leftImageRandom.name;
  centerPicturImageAT = centerImageRandom.name;
  rightPicturImageAT = rightImageRandom.name;

  //console.log(leftPicturImageAT);

  if (lastSeen.includes(leftPicturImageAT) || lastSeen.includes(centerPicturImageAT)  ||  lastSeen.includes(rightPicturImageAT) || leftPicturImageAT === rightPicturImageAT || leftPicturImageAT === centerPicturImageAT || centerPicturImageAT === rightPicturImageAT || centerPicturImageAT === leftPicturImageAT) {
    while (lastSeen.includes(leftPicturImageAT) || lastSeen.includes(centerPicturImageAT)  ||  lastSeen.includes(rightPicturImageAT)  || leftPicturImageAT === rightPicturImageAT || leftPicturImageAT === centerPicturImageAT || centerPicturImageAT === rightPicturImageAT || centerPicturImageAT === leftPicturImageAT) {

      pickRandomImages();

    }
  }
  else {
    var left_title = leftPicturImage.getAttribute('alt');
    var center_title = centerPicturImage.getAttribute('alt');
    var right_title = rightPicturImage.getAttribute('alt');
    times_showed[pictursImages.indexOf(left_title)] += 1;
    times_showed[pictursImages.indexOf(center_title)] += 1;
    times_showed[pictursImages.indexOf(right_title)] += 1;


  }
  lastSeen = [];
}

for (var i = 0; i < pictursImages.length; i++) {
  new Pictur(pictursImages[i]);//we pass the name of the picturs from the array
}
pickRandomImages();




console.log(picturs);

// Variables to store the picturs already on the page
// the allImages array is a property of the Picture constructor
function clickImage(e) {
  if (e.target.id === 'left_pictur_img' || e.target.id === 'center_pictur_img' || e.target.id === 'right_pictur_img') {
    if (e.target.id === 'left_pictur_img') {
      var left_title = leftPicturImage.getAttribute('alt');
      times_clicked[pictursImages.indexOf(left_title)] += 1;
    }
    if (e.target.id === 'center_pictur_img') {
      var center_title = centerPicturImage.getAttribute('alt');
      times_clicked[pictursImages.indexOf(center_title)] += 1;
    }
    if (e.target.id === 'right_pictur_img') {
      var right_title = rightPicturImage.getAttribute('alt');
      times_clicked[pictursImages.indexOf(right_title)] += 1;
    }
    lastSeen=[];
    lastSeen.push(leftPicturImage.getAttribute('alt'));
    lastSeen.push(centerPicturImage.getAttribute('alt'));
    lastSeen.push(rightPicturImage.getAttribute('alt'));
    

    pickRandomImages();
    totalClicks++;

  }
  if (totalClicks === 26) {
    //remove event listener
    leftPicturImage.remove();
    rightPicturImage.remove();
    centerPicturImage.remove();
    console.log('finished');
    var report = document.querySelector('#report');
    for (var i = 0; i < pictursImages.length; i++) {
      var x = document.createElement('LI');
      var t = document.createTextNode(pictursImages[i] + ' was shown ' + times_showed[i] + ' times and had votes ' + times_clicked[i] + ' times.');
      x.appendChild(t);
      report.appendChild(x);






    }
    renderChartResult();

  }
}
// clickImage();

rightPicturImage.addEventListener('click', clickImage);
leftPicturImage.addEventListener('click', clickImage);
centerPicturImage.addEventListener('click', clickImage);


// groupImageSection.addEventListener('click' , clickImage);

//when they reach total max clicks, remove the clicky function



// Instantiate my image objects
//helper functions
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}






function renderChartResult(){

  var pictursNames = [];

  for(var i = 0 ; i < picturs.length; i++){
    var picturName = picturs[i].name;
    pictursNames.push(picturName);


  }


  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: pictursNames,
      datasets: [{
        label: '# of show',

        data: times_showed,

        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        backgroundColor2: 'rgb(0,0,205)',

        borderColor: 'rgba(255, 99, 132, 1)',
        borderColor2: 'rgb(0,0,205)',
        borderWidth: 1


      },

      {
        label: '# of votes',
        data: times_clicked,
        backgroundColor: 'rgb(0, 191, 255)',
        borderColor: 'rgba(295, 99, 132, 1)',
        borderWidth: 1,
      } ]


    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}

























