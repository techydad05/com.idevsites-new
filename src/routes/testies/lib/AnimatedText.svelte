<!-- AnimatedText.svelte -->
<script>
    import { fade, fly, scale, blur } from 'svelte/transition';
    import { 
      linear, cubicIn, cubicOut, cubicInOut,
      quadIn, quadOut, quadInOut,
      quartIn, quartOut, quartInOut,
      quintIn, quintOut, quintInOut,
      sineIn, sineOut, sineInOut,
      expoIn, expoOut, expoInOut,
      circIn, circOut, circInOut,
      backIn, backOut, backInOut,
      elasticIn, elasticOut, elasticInOut,
      bounceIn, bounceOut, bounceInOut
    } from 'svelte/easing';
  
    export let text;
    export let animation;
    export let duration;
    export let opacity;
    export let easing;
    export let color;
    export let size;
  
    let visible = true;
  
    $: animationProps = {
      duration: $duration,
      opacity: $opacity,
      easing: getEasingFunction($easing)
    };
  
    function getEasingFunction(easingName) {
      const easingFunctions = { 
        linear, cubicIn, cubicOut, cubicInOut,
        quadIn, quadOut, quadInOut,
        quartIn, quartOut, quartInOut,
        quintIn, quintOut, quintInOut,
        sineIn, sineOut, sineInOut,
        expoIn, expoOut, expoInOut,
        circIn, circOut, circInOut,
        backIn, backOut, backInOut,
        elasticIn, elasticOut, elasticInOut,
        bounceIn, bounceOut, bounceInOut
      };
      return easingFunctions[easingName] || linear;
    }
  
    function rotate(node, { duration = 1000, easing = linear, opacity = 0, degrees = 360 }) {
      return {
        duration,
        easing,
        css: t => `
          transform: rotate(${t * degrees}deg);
          opacity: ${opacity + t * (1 - opacity)};
        `
      };
    }
  
    function getTransition(node, params) {
      switch ($animation) {
        case 'fadeIn': return fade(node, params);
        case 'slideIn': return fly(node, { ...params, x: -100 });
        case 'scaleIn': return scale(node, params);
        case 'rotateIn': return rotate(node, { ...params, degrees: 360 });
        case 'bounceIn': return scale(node, { ...params, start: 0.5, opacity: 0, easing: bounceOut });
        case 'flipIn': return fly(node, { ...params, y: 100, rotate: 180 });
        case 'swingIn': return fly(node, { ...params, x: -100, easing: elasticOut });
        case 'rollIn': return fly(node, { ...params, x: -100, rotate: 360 });
        case 'zoomIn': return scale(node, { ...params, start: 0.5 });
        case 'shakeIn': return fly(node, { ...params, x: 10, y: 10, easing: (t) => Math.sin(t * 10) });
        default: return fade(node, params);
      }
    }
  
    export function playAnimation() {
      visible = false;
      setTimeout(() => visible = true, 50);
    }
  </script>
  
  <div class="animated-text" style="color: {$color}; font-size: {$size}px;">
    {#if visible}
      <p in:getTransition={animationProps} out:fade>
        {$text}
      </p>
    {/if}
  </div>
  
  <style>
    .animated-text {
      min-height: 3rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  </style>