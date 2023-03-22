import { Fancybox } from "@fancyapps/ui";

export namespace fancybox {
  Fancybox.bind("[data-fancybox]", {
    groupAll: true,
    Thumbs: {
      type: "classic",
    },
  });
}
