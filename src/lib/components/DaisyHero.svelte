<script>
  let scrolled;
  function getScrollPercent() {
    let h = document.documentElement,
      b = document.body,
      st = "scrollTop",
      sh = "scrollHeight";
    scrolled = ((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100;
    // console.log(scrolled);
    return scrolled;
  }
</script>

<svelte:window on:scroll={() => getScrollPercent()} />

<div
  class="hero min-h-screen !bg-no-repeat bg-center"
  style:background-position={`-${scrolled * 5}px 0`}
  style="background: url(/red-dragon.jpeg); background-size: auto 100% !important;"
>
  <div class="hero-overlay bg-opacity-60"></div>
  <div class="hero-content text-center text-neutral-200">
    <div class="max-w-2xl pt-8">
      <h1 class="mb-5 text-5xl font-bold">A Little bit about us</h1>
      <p class="mb-5 text-xl tracking-wider font-semibold">
        We are The Lure of Downtown St. Petersburg, Florida. The Lure has been
        serving DTSP, as a city and as a sushi roll, for nearly 10 years.. and
        still going strong. We have a great menu that is updated regulary, we
        have the best cocktails in the area - check out our <a
          class="link link-primary"
          href="/">reviews</a
        >, our sushi has gotten local awards, and our tapas are just as good. Oh
        did we mention that we also have the best Billiard tables around. We
        also have plenty of seats! Check us out in the heart of downtown St.
        Petersburg at <a class="link link-primary" href="/">611 central ave.</a>
      </p>
      <button class="btn btn-primary">Check out our menu</button>
    </div>
  </div>
</div>
