export namespace readmore {
  if (document.readyState === "loading") {
    // Loading hasn't finished yet
    document.addEventListener("DOMContentLoaded", init);
  } else {
    // `DOMContentLoaded` has already fired
    init();
  }

  function init() {
    const maxL: number = 480;
    const contentList: NodeListOf<HTMLElement> = document.querySelectorAll(".gallery-rollup__summary");

    for (let i = 0; i < contentList.length; i++) {
      const content: Element = contentList[i];
      const text: string | null = content.innerHTML;

      if (text && text.length > maxL) {
        const begin: string = text.substring(0, maxL);
        const end: string = text.substring(maxL);

        const htmlToInsert = '<span>' + begin + '<span class="gallery-rollup__ellipsis">...</span></span>' +
        '<a class="gallery-rollup__read-more" href="#">Read full description > </a>' +
        '<span class="gallery-rollup__summary--hidden">' +
        end +
        "</span>";

         content.innerHTML = htmlToInsert;
      }
    }

    const readmoreEl = document.querySelector('.gallery-rollup__read-more');

    if (!readmoreEl) {
      return;
    }

    readmoreEl.addEventListener("click", (event: MouseEvent) => {

       if (event.currentTarget && event.currentTarget instanceof HTMLElement) {
         event.preventDefault();
         const hiddenDiv: HTMLElement = event.currentTarget.nextElementSibling as HTMLElement;
         const ellipsisEl: HTMLElement = document.querySelector('.gallery-rollup__ellipsis') as HTMLElement;
         const parentEl: HTMLElement = event.currentTarget.parentElement as HTMLElement;
         hiddenDiv.classList.toggle("gallery-rollup__summary--hidden");
         ellipsisEl.style.display = 'none';
         event.currentTarget.style.display = 'none';
         parentEl.style.display = 'block';
       }
     });
  };
}
