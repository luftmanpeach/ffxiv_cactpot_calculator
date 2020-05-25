var options = "<option>0</option><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option><option>7</option><option>8</option><option>9</option>";
var num = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
var payout = [
	NaN, NaN, NaN, NaN, NaN, NaN,
	10000, 36, 720, 360, 80, 252, 108, 72,
	54, 180, 72, 180, 119, 36, 306, 1080, 144, 1800, 3600
];


function get(e) {
  return document.getElementById(e);
}

function makeForm() {
  // scrach form
  var table = get("scratchForm");

  // header row
  var row = table.insertRow(-1);
  for (var i = 3; i < 8; i++) {
    var el = row.insertCell(-1);
    var s = '<input id=Expect' + i + ' readOnly="true"/>';
    el.innerHTML = s;
  }

  // bottom 3 rows
  for (var i = 0; i < 3; i++) {
    var row = table.insertRow(-1);
    var el = row.insertCell(-1);
    var s = '<input id=Expect' + i + ' readOnly="true"/>';
    el.innerHTML = s;
    for (var j = 0; j < 3; j++) {
      var el = row.insertCell(-1);
      var s = '<select id=Select' + i + j + ' onchange="onSelect();onUpdate();">' + options + '</select>';
      el.innerHTML = s;
    }
  }

  // payout form
	// multiple
  var table = get("payoutForm");
	var multiple = table.insertRow(-1);
	multiple.innerHTML = "<tr><th>multiple</th><th><input id=Payout888 value=1.0 /></th></tr>";

	// normal payout
	var header = table.insertRow(-1);
	header.innerHTML = "<tr><th>num</th><th>reward</th><th>num</th><th>reward</th></tr>";
  for (var i = 6; i < 15; i++) {
    var row = table.insertRow(-1);
    var el = row.insertCell(-1);
    el.innerHTML = i;
    var el = row.insertCell(-1);
    var s = '<input id=Payout' + i + ' value=' + payout[i] + ' />';
    el.innerHTML = s;
    var j = i+10;
    var el = row.insertCell(-1);
    el.innerHTML = j;
    var el = row.insertCell(-1);
    var s = '<input id=Payout' + j + ' value=' + payout[j] + ' />';
    el.innerHTML = s;
  }
  // payout form extra row
  var i = 15;
  var row = table.insertRow(-1);
  var el = row.insertCell(-1);
  el.innerHTML = i;
  var el = row.insertCell(-1);
  var s = '<input id=Payout' + i + ' value=' + payout[i] + ' />';
  el.innerHTML = s;
}


function onSelect() {
  // get all selections
  var selected = [];
  for (var row = 0; row < 3; row++) {
    for (var col = 0; col < 3; col++) {
      var i = get("Select" + row + col).value;
      if (i != 0) {
        selected.push(i);
      }
    }
  }

  // update option availibility based on selections
  for (var row = 0; row < 3; row++) {
    for (var col = 0; col < 3; col++) {
      var select = get("Select" + row + col);
      for (var i = 1; i <= 9; i++) {
        select.options[i].disabled = selected.includes(num[i]);
      }
    }
  }
}

function sum(a, b, c) {
  return parseInt(a.value)+parseInt(b.value)+parseInt(c.value);
}

function onUpdate() {
  get("Expect0").value = sum(get("Select00"), get("Select01"), get("Select02"));  // row 1
  get("Expect1").value = sum(get("Select10"), get("Select11"), get("Select12"));  // row 2
  get("Expect2").value = sum(get("Select20"), get("Select21"), get("Select22"));  // row 3
  get("Expect3").value = sum(get("Select00"), get("Select11"), get("Select22"));  // \
  get("Expect4").value = sum(get("Select00"), get("Select10"), get("Select20"));  // col 1
  get("Expect5").value = sum(get("Select01"), get("Select11"), get("Select21"));  // col 2
  get("Expect6").value = sum(get("Select02"), get("Select12"), get("Select22"));  // col 3
  get("Expect7").value = sum(get("Select02"), get("Select11"), get("Select20"));  // /
}

function onRefresh() {
  // expectations
  for (var i=0; i<8; i++) {
    var ex = get("Expect"+i);
    ex.value = "";
  }


  // selections
  for (var row = 0; row < 3; row++) {
    for (var col = 0; col < 3; col++) {
      var select = get("Select" + row + col);
      select.value = 0;
      for (var i = 1; i <= 9; i++) {
        select.options[i].disabled = false;
      }
    }
  }

}
