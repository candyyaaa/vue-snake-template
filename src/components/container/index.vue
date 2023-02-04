<script setup lang="ts">
interface Props {
  direction?: string
  page?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  /**
   * @description: flex 方向
   * @可选值 row | column
   * @默认值 column
   */
  direction: 'column',
  /**
   * @description: 是否是页面布局(padding: 10px)
   * @默认值 false
   */
  page: false
})
</script>

<template>
  <div
    class="container-wrap"
    :class="{
      'container-wrap__column': props.direction === 'column',
      'container-wrap__row': props.direction === 'row',
      'container-wrap__page': props.page
    }"
  >
    <header class="container-header">
      <slot name="header"></slot>
    </header>
    <main class="container-body">
      <slot></slot>
    </main>
    <footer class="container-footer">
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.container-wrap {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  flex-direction: column;

  .container-header {
    flex-shrink: 0;
  }

  .container-body {
    flex: 1;
    flex-basis: 0;
    overflow: hidden;
  }

  .container-footer {
    flex-shrink: 0;
  }

  &__column {
    flex-direction: column;
  }

  &__row {
    flex-direction: row;
  }

  &__page {
    .container-header {
      padding: 10px;
    }

    .container-body {
      padding: 0 10px;
    }

    .container-footer {
      padding: 0 10px;
    }
  }
}
</style>
