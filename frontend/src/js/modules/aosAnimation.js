import AOS from "aos";
import 'aos/dist/aos.css';

export const aosAnimation = () => {
  let aosExampleBlock = document.getElementById('example-animation');
  if (!aosExampleBlock) {
    return
  }

  AOS.init({
    once: true,
  })
  // прочитать документацию можно тут https://github.com/michalsnik/aos
}
