
/* this function calls when app gets loaded */
$(document).ready(function () {

  const test = false;
  /* declared a variable that store current month year */
  const now = moment().format('MMMM Do YYYY');

  /* nowHour24 store hour format in 24 hrs */
  let nowHour24 = moment().format('H');

  /* nowHour12 store hour format in 12 hrs */
  let nowHour12 = moment().format('h');

  /* If test value is true then this set of code will execute */
  if (test) {
    nowHour24 = 13;
    nowHour12 = 1;
  }

  /* $dateHeading takes the reference of id and putting the value of now */
  let $dateHeading = $('#navbar-subtitle');
  $dateHeading.text(now);
  const saveIcon = "./images/save-regular.svg";

  /* storedPlans stores the value storedPlans from localstorage  */
  let storedPlans = JSON.parse(localStorage.getItem("storedPlans"));

  if (test) { console.log(storedPlans) }

  /* this set of code will execute if storedPlans have set of data*/
  if (storedPlans !== null) {
    planTextArr = storedPlans;
  } else {
    planTextArr = new Array(9);
    planTextArr[5] = "Movie with friends";
  }

  if (test) { console.log("full array of plned text", planTextArr); }

  /* $plannerDiv will get the html element refernce of id 'planner'*/
  let $plannerDiv = $('#planner');
  $plannerDiv.empty();

  if (test) { console.log("current time", nowHour12); }

  /* iterates the hours between 9 to 17 */
  for (let hour = 9; hour <= 17; hour++) {

    let index = hour - 9;

    let $rowDiv = $('<div>');
    $rowDiv.addClass('row');
    $rowDiv.addClass('plannerRow');
    $rowDiv.attr('hour-index', hour);

    let $col2TimeDiv = $('<div>');
    $col2TimeDiv.addClass('col-md-2');

    const $timeBoxSpn = $('<span>');

    $timeBoxSpn.attr('class', 'timeBox');

    let displayHour = 0;
    let ampm = "";
    if (hour > 12) {
      displayHour = hour - 12;
      ampm = "pm";
    } else {
      displayHour = hour;
      ampm = "am";
    }

    $timeBoxSpn.text(`${displayHour} ${ampm}`);

    $rowDiv.append($col2TimeDiv);
    $col2TimeDiv.append($timeBoxSpn);

    let $dailyPlanSpn = $('<input>');

    $dailyPlanSpn.attr('id', `input-${index}`);
    $dailyPlanSpn.attr('hour-index', index);
    $dailyPlanSpn.attr('type', 'text');
    $dailyPlanSpn.attr('class', 'dailyPlan');

    $dailyPlanSpn.val(planTextArr[index]);

    let $col9IptDiv = $('<div>');
    $col9IptDiv.addClass('col-md-9');

    $rowDiv.append($col9IptDiv);
    $col9IptDiv.append($dailyPlanSpn);

    let $col1SaveDiv = $('<div>');
    $col1SaveDiv.addClass('col-md-1');

    let $saveBtn = $('<i>');
    $saveBtn.attr('id', `saveid-${index}`);
    $saveBtn.attr('save-id', index);
    $saveBtn.attr('class', "far fa-save saveIcon");

    $rowDiv.append($col1SaveDiv);

    $col1SaveDiv.append($saveBtn);

    updateRowColor($rowDiv, hour);

    $plannerDiv.append($rowDiv);

  };

  /* this function updates the color of div */
  function updateRowColor($hourRow, hour) {

    if (test) { console.log("rowColor ", nowHour24, hour); }

    if (hour < nowHour24) {

      if (test) { console.log("lessThan"); }
      $hourRow.css("background-color", "red")
    } else if (hour > nowHour24) {
      if (test) { console.log("greaterthan"); }
      $hourRow.css("background-color", "lightgreen")
    } else {
      if (test) { console.log("eqaul"); }
      $hourRow.css("background-color", "orange")
    }
  };


  /* Detects click on i tag of html */
  $(document).on('click', 'i', function (event) {
    event.preventDefault();

    if (test) { console.log('click pta before ' + planTextArr); }

    let $index = $(this).attr('save-id');

    let inputId = '#input-' + $index;
    let $value = $(inputId).val();

    planTextArr[$index] = $value;


    if (test) { console.log('value ', $value); }
    if (test) { console.log('index ', $index); }
    if (test) { console.log('click pta after ' + planTextArr); }

    /* removed class  'shadowPulse' from id #saveid-index*/
    $(`#saveid-${$index}`).removeClass('shadowPulse');
    localStorage.setItem("storedPlans", JSON.stringify(planTextArr));
  });

  /* Dectes change of input in id  hour-index*/
  $(document).on('change', 'input', function (event) {
    event.preventDefault();
    if (test) { console.log('onChange'); }
    if (test) { console.log('id', $(this).attr('hour-index')); }


    let i = $(this).attr('hour-index');

    $(`#saveid-${i}`).addClass('shadowPulse');
  });
});