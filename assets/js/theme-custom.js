// File for your custom JavaScript

// Sliders

// Employees Slider & Input
  var $employeesRange = $("#employeesSlider");
  var $employeesInput = $("#employeesInput");
  var employeesInstance;
  var employeesMin = 0;
  var employeesMax = 10000;


  $employeesRange.ionRangeSlider({
      min: employeesMin,
      max: employeesMax,
      from: 500,
      step: 50,
      extra_classes: "range-slider range-slider-indicator range-slider-grid mx-8",
      grid: true,
      hide_from_to: false,
      hide_min_max: true,
      prefix: "",
      prettify_enabled: true,
      prettify_separator: ",",
      max_postfix: "+",

      onStart: function(data) {
          $employeesInput.prop("value", data.from);
      },
      onChange: function(data) {
          $employeesInput.prop("value", data.from);
          updateValues();
      }
  });

  employeesInstance = $employeesRange.data("ionRangeSlider");

  $employeesInput.on("input", function() {
      var val = $(this).prop("value");

      // validate
      if (val < employeesMin) {
          val = employeesMin;
      } else if (val > employeesMax) {
          val = employeesMax;
      }

      employeesInstance.update({
          from: val
      });
  });

// Meetings Slider & Input
  var $meetingsRange = $("#meetingsSlider");
  var $meetingsInput = $("#meetingsInput");
  var meetingsInstance;
  var meetingsMin = 0;
  var meetingsMax = 10;

  $meetingsRange.ionRangeSlider({
      min: meetingsMin,
      max: meetingsMax,
      from: 5,
      step: 1,
      extra_classes: "range-slider range-slider-indicator range-slider-grid mx-8",
      grid: true,
      hide_from_to: false,
      hide_min_max: true,
      postfix: " meetings",
      prettify_enabled: true,
      prettify_separator: ",",
      max_postfix: "+",

      onStart: function(data) {
          $meetingsInput.prop("value", data.from);
      },
      onChange: function(data) {
          $meetingsInput.prop("value", data.from);
          updateValues();
      }
  });

  meetingsInstance = $meetingsRange.data("ionRangeSlider");

  $meetingsInput.on("input", function() {
      var val = $(this).prop("value");

      // validate
      if (val < meetingsMin) {
          val = meetingsMin;
      } else if (val > meetingsMax) {
          val = meetingsMax;
      }

      meetingsInstance.update({
          from: val
      });
  });

// Time Slider & Input
  var $timeRange = $("#timeSlider");
  var $timeInput = $("#timeInput");
  var timeInstance;
  var timeMin = 0;
  var timeMax = 60;

  $timeRange.ionRangeSlider({
      min: timeMin,
      max: timeMax,
      from: 15,
      step: 1,
      extra_classes: "range-slider range-slider-indicator range-slider-grid mx-8",
      grid: true,
      hide_from_to: false,
      hide_min_max: true,
      postfix: " minutes",
      prettify_enabled: true,
      prettify_separator: ",",
      max_postfix: "+",

      onStart: function(data) {
          $timeInput.prop("value", data.from);
      },
      onChange: function(data) {
          $timeInput.prop("value", data.from);
          updateValues();
      }
  });

  timeInstance = $timeRange.data("ionRangeSlider");

  $timeInput.on("input", function() {
      var val = $(this).prop("value");

      // validate
      if (val < timeMin) {
          val = timeMin;
      } else if (val > timeMax) {
          val = timeMax;
      }

      timeInstance.update({
          from: val
      });
  });

// Cost Slider & Input
  var $costRange = $("#costSlider");
  var $costInput = $("#costInput");
  var costInstance;
  var costMin = 0;
  var costMax = 1000;

  $costRange.ionRangeSlider({
      min: costMin,
      max: costMax,
      from: 20,
      step: 5,
      extra_classes: "range-slider range-slider-indicator range-slider-grid mx-8",
      grid: true,
      hide_from_to: false,
      hide_min_max: true,
      prefix: "$",
      postfix: " / hour",
      prettify_enabled: true,
      prettify_separator: ",",
      max_postfix: "+",

      onStart: function(data) {
          $costInput.prop("value", data.from);
      },
      onChange: function(data) {
          $costInput.prop("value", data.from);
          updateValues();
          $('#header').show();
      }
  });

  costInstance = $costRange.data("ionRangeSlider");

  $costInput.on("input", function() {
      var val = $(this).prop("value");

      // validate
      if (val < costMin) {
          val = costMin;
      } else if (val > costMax) {
          val = costMax;
      }

      costInstance.update({
          from: val
      });
  });

  updateValues();

  // Maths

  function updateValues() {
    // Variables to track
    var numberEmployees = parseInt($employeesInput.prop("value"));
    var numberMeetings = parseInt($meetingsInput.prop("value"))
    var numberTime = parseInt($timeInput.prop("value"));
    var numberCost = parseInt($costInput.prop("value"));

    // Time spent scheduling
    var minsSchedulingDay = numberEmployees * numberMeetings * numberTime;
    var minsSchedulingYear = minsSchedulingDay * 52;
    var hoursSchedulingYear = minsSchedulingYear / 60;

    // Cost of scheduling
    var costScheduling = hoursSchedulingYear * numberCost;

    // Cost of ScheduleOnce
    var costScheduleOnce = numberEmployees * 108;

    // ROI
    var moneySaved = costScheduling - costScheduleOnce;
    var roiPercentage = numeral(moneySaved / costScheduleOnce).format('0%');

    // Formatted Values
    var formattedHoursSchedulingYear = numeral(hoursSchedulingYear).format('0,0');
    var formattedCostScheduling = numeral(costScheduling).format('$0,0');
    var formattedCostScheduleOnce = numeral(costScheduleOnce).format('$0,0');
    var formattedMoneySaved = numeral(moneySaved).format('$0,0');
    var formattedRoiPercentage = numeral(roiPercentage).format('0%');

    // Set Values
    $('#hoursSaved').html(formattedHoursSchedulingYear);
    $('#moneySaved').html(formattedMoneySaved);
    $('#ROI').html(formattedRoiPercentage);

    // Log
    console.log(minsSchedulingDay + " minutes spent scheduling / day");
    console.log(minsSchedulingYear + " minutes spent scheduling / year");
    console.log(formattedHoursSchedulingYear + " hours spent scheduling / year");
    console.log(formattedCostScheduling + " = cost of scheduling / year");
    console.log(formattedCostScheduleOnce + " = cost of ScheduleOnce / year");
    console.log(formattedMoneySaved + " saved / year");
    console.log(formattedRoiPercentage + " ROI");
  };
