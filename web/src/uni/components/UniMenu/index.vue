<template>
  <component
    :is="menuComponent"
    :item-or-menu="item"
    v-if="item.meta && !item.meta.hidden"
  >
    <template v-if="item.children && item.children.length">
      <uni-menu
        v-for="route in item.children"
        :key="route.path"
        :item="route"
      />
    </template>
  </component>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "UniMenu",
  props: {
    item: {
      type: Object,
      required: true,
    },
    layout: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      menuComponent: "UniMenuItem",
    };
  },
  computed: {
    ...mapGetters({
      collapse: "settings/collapse",
    }),
  },
  created() {
    if (
      this.item.children &&
      this.item.children.some((route) => {
        return route.meta && route.meta.hidden !== true;
      })
    )
      this.menuComponent = "UniSubmenu";
  },
};
</script>
