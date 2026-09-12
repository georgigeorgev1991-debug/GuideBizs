const DOMAIN = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

/**
 * First-party rewrite at /js/statistiek.js. Injected after load + 4s so it
 * never contends with home LCP (hero copy + Archivo).
 */
export function Plausible() {
  if (!DOMAIN) {
    return null;
  }

  const domain = JSON.stringify(DOMAIN);

  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `window.addEventListener("load",function(){setTimeout(function(){if(document.querySelector("[data-analytics=plausible]"))return;var s=document.createElement("script");s.src="/js/statistiek.js";s.defer=true;s.dataset.domain=${domain};s.dataset.analytics="plausible";document.body.appendChild(s);},4000)});`,
      }}
    />
  );
}
