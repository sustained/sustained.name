import Vue from "vue";

const sizes = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280
};

const sm = width => width >= sizes.sm && width <= sizes.md;
const md = width => width >= sizes.md && width <= sizes.lg;
const lg = width => width >= sizes.lg && width <= sizes.xl;
const xl = width => width >= sizes.xl;

function getBreakpoint(width) {
  if (sm(width)) return "sm";
  else if (md(width)) return "md";
  else if (lg(width)) return "lg";
  else if (xl(width)) return "xl";
  else return "all";
}

const breakpoints = Vue.observable({
  w: document.documentElement.clientWidth,
  h: document.documentElement.clientHeight,
  is: getBreakpoint(document.documentElement.clientWidth)
});

window.addEventListener(
  "resize",
  () => {
    breakpoints.w = document.documentElement.clientWidth;
    breakpoints.h = document.documentElement.clientHeight;
    breakpoints.is = getBreakpoint(document.documentElement.clientWidth);
  },
  { passive: true }
);

Vue.prototype.$breakpoints = breakpoints;
