<script>
    export let component = '';
  
    const components = {
      button: `<button class="btn">Button</button>`,
      card: `
        <div class="card w-96 bg-base-100 shadow-xl">
          <div class="card-body">
            <h2 class="card-title">Card Title</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-end">
              <button class="btn btn-primary">Buy Now</button>
            </div>
          </div>
        </div>`,
      modal: `
        <div class="modal">
          <div class="modal-box">
            <h3 class="font-bold text-lg">Congratulations!</h3>
            <p class="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
            <div class="modal-action">
              <button class="btn">Yay!</button>
            </div>
          </div>
        </div>`,
      alert: `<div class="alert alert-error"><div><span>Error! Something went wrong.</span></div></div>`,
      // Add other components here
    };
  
    $: Component = components[component];
  </script>
  
  {@html Component}
  