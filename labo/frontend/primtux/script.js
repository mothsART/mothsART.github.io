
function hidden_all_step() {
    var steps = document.getElementsByClassName("step");
    for (var i = 0, len = steps.length; i < len; i++) {
        steps[i].classList.add("d-none");
    }
}

function show_step(id) {
    var element = document.getElementById(id);
    element.classList.remove("d-none");
}

function valid_step_one() {
  hidden_all_step();
  var assembly = parseInt(document.getElementById("inlineFormCustomSelect").value);
  var dys = document.getElementById("customControlAutosizing").checked;
  if (dys) {
      if (assembly != 4 && assembly != 5) {
        show_step("step-primtux2-dys");
      }
      else {
          show_step("no-primtux-available");
      }
  }
  else {
    if (assembly == 1) {
      show_step("step-before-2004");
    }
    else if (assembly == 2) {
      show_step("step-from-2004");
    }
    else if (assembly == 3) {
      show_step("step-from-2006");
    }
    else if (assembly == 4) {
      show_step("step-download-primtux2-rpi");
    }
    else if (assembly == 5) {
      show_step("step-download-primtux3-rpi");
    }
  }
}

function valid_step_before_2004() {
  hidden_all_step();
  show_step("step-before-2004");
  var processor2004 = document.getElementById("2004-processor").checked;
  var ram512 = document.getElementById("ram512").checked;
  if (processor2004 && ram512) {
    show_step("step-download-primtux2");
  }
  else {
    show_step("no-primtux-available");
  }
}

function valid_step_from_2004() {
  hidden_all_step();
  show_step("step-from-2004");
  var processor_before_2004 = document.getElementById("step-from-2004-processor-before-2004").checked;
  var processor_from_2004   = document.getElementById("step-from-2004-processor-from-2004").checked;
  var ram                   = parseInt(document.getElementById("ram-step-before-2004").value);
  if (processor_before_2004 || ram == 1) {
    show_step("step-download-primtux2");
  }
  else if (ram == 2) {
    show_step("step-download-primtux3-i386");
  }
  else {
    show_step("step-download-primtux3-amd64");
  }
}

function valid_step_from_2006() {
  hidden_all_step();
  show_step("step-from-2006");
  var processor_from_2004 = document.getElementById("step-from-2006-processor-from-2004").checked;
  var processor_from_2006 = document.getElementById("step-from-2006-processor-from-2006").checked;
  var ram                 = parseInt(document.getElementById("ram-step-from-2006").value);
  var install_on_vm       = document.getElementById("install-on-vm").checked;
  if (install_on_vm) {
      show_step("step-install-vm");
  }
  else {
      if (ram == 1) {
        show_step("step-download-primtux2");
      }
      else if (processor_from_2004 || ram == 2) {
        show_step("step-download-primtux3-i386");
      }
      else if (processor_from_2004 && ram == 3) {
        show_step("step-download-primtux3-amd64");
      }
      else {
          show_step("step-download-primtux4-amd64");
      }
  }
}

function autoriseVm(element) {
    var installOnVM = document.getElementById("install-on-vm");
    if (parseInt(element.value) == 4) {
        installOnVM.removeAttribute("disabled");
    }
    else {
        installOnVM.setAttribute("disabled", "disabled");
        installOnVM.checked = false;
    }
}