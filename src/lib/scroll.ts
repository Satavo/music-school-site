export function scrollToContact(pathname: string) {
  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  const base = pathname === "/" ? "/" : pathname;
  window.history.pushState(null, "", `${base}#contact`);
}
