function get_cookie(name) {
  var value = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
  return value ? value[2] : null;
}
const program = get_cookie("program");

document.querySelector("#program_name").innerHTML = program;
document.querySelector("short-cut").setAttribute("program", program);
