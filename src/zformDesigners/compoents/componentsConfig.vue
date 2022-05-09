<template>
  <div class="componentsConfig">
    <header class="header">组件配置</header>
    <main class="main">
      <div class="form_config">
        <a-form-model :model="form">
          <a-form-model-item label="Activity name">
            <a-input v-model="form.name" />
          </a-form-model-item>
          <a-form-model-item label="Activity zone">
            <a-select v-model="form.region" placeholder="please select your zone">
              <a-select-option value="shanghai">Zone one</a-select-option>
              <a-select-option value="beijing">Zone two</a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item label="Activity time">
            <a-date-picker
              v-model="form.date1"
              show-time
              type="date"
              placeholder="Pick a date"
              style="width: 100%;"
            />
          </a-form-model-item>
          <a-form-model-item label="Instant delivery">
            <a-switch v-model="form.delivery" />
          </a-form-model-item>
          <a-form-model-item label="Activity type">
            <a-checkbox-group v-model="form.type">
              <a-checkbox value="1" name="type">Online</a-checkbox>
              <a-checkbox value="2" name="type">Promotion</a-checkbox>
              <a-checkbox value="3" name="type">Offline</a-checkbox>
            </a-checkbox-group>
          </a-form-model-item>
          <a-form-model-item label="Resources">
            <a-radio-group v-model="form.resource">
              <a-radio value="1">Sponsor</a-radio>
              <a-radio value="2">Venue</a-radio>
            </a-radio-group>
          </a-form-model-item>
          <a-form-model-item label="Activity form">
            <a-input v-model="form.desc" type="textarea" />
          </a-form-model-item>
        </a-form-model>
      </div>
      <div class="components_config"></div>
    </main>
  </div>
</template>
<script>
export default {
  name: 'componentsConfig',
  components: {
    // tabs
  },
  data() {
    return {
      tabsModel: '',
      form: {
        name: '',
        region: undefined,
        date1: undefined,
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      tabsOption: [
        {
          name: '表单配置',
          key: '1'
        },
        {
          name: '组件配置',
          key: '2'
        }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/layout.scss';
.componentsConfig {
  width: 100%;
  height: 100%;
  .header {
    width: 100%;
    height: 40px;
    font-weight: 500;
    font-size: 18px;
    border-bottom: 1px solid #ececec;
    @include flex-row-c-c;
  }
  .main {
    width: 100%;
    height: calc(100% - 40px);
    padding: 4px 8px;
    .form_config {
      width: 100%;
    }
    .components_config {
      width: 100%;
    }
  }
}
</style>