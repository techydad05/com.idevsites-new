<script>
    // todo: ask gpt about this as default or something else?
    export let close = () => {};
</script>

<a href="/about-us" use:close>
    <button class="btn btn-primary lg:btn-link lg:no-underline mb-2 w-full">About Us</button>
</a>
<a href="/shop" use:close>
    <button class="btn btn-primary lg:btn-link lg:no-underline mb-2 w-full">Shop</button>
</a>
<div class="dropdown dropdown-right dropdown-bottom">
  <label tabindex={0} class="btn btn-link">Testies</label>
  <ul tabindex={0} class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
    <li><a href="/testies/christian">Christian</a></li>
    <li><a href="/testies/leo">Leo</a></li>
    <li><a href="/testies/textanim">TextAnim</a></li>
    <li><a href="/testies/gpt">GPT</a></li>
    <li><a href="/testies/dnd">DND</a></li>
  </ul>
</div>