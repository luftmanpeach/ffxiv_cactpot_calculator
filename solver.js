function get(e) {
  return document.getElementById(e);
}

function makeForm() {
  var table = get("scratchForm");

  // header row
  var head = table.insertRow(-1);
  for (var i = 0; i < 5; i++) {
    var el = head.insertCell(-1);
    var s = '<Input id=Expectation_"' + i + '" readOnly="true"/>';
    el.innerHTML = s;
  }

  // bottom 3 rows
  for (var i = 5; i < 8; i++) {
    var row = table.insertRow(-1);
    var el = row.insertCell(-1);
    var s = '<Input id=Expectation_"' + i + '" readOnly="true"/>';
    el.innerHTML = s;
    for (var j = 0; j < 3; j++) {
      var el = row.insertCell(-1);
      var s = '<input id=Input_"' + i + j + '"/>';
      el.innerHTML = s;
    }
  }


}
