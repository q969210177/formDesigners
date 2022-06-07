
<template>
  <div class="zFormCreate">
    <zFormCreate v-model="api" :formConfig="formConfig" :rule="rule"></zFormCreate>
  </div>
</template>
<script>
  export default {
    data() {
      api: {},
      formConfig:{"labelCol":{"span":6},"wrapperCol":{"span":18},"labelAlign":"left","labelWidth":110,"colonStatus":true},
      rule: [{"type":"switch","value":false,"label":"switch","props":{"disabled":true},"rules":[],"span":12,"formProps":{"isRequired":false},"fileId":"l42ms38i1390"}{"type":"select","value":"","label":"111","props":{},"options":[{"label":"这是一个简单的表单设计器","value":"22"},{"label":"1","value":"1"},{"label":"2","value":"2"},{"label":"3","value":"3"}],"rules":[],"span":12,"formProps":{"isRequired":false},"fileId":"l43i419b243"}{"type":"input","value":"","label":"111","props":{},"rules":[],"span":24,"formProps":{"isRequired":false},"fileId":"l43jepgf1b7e"}]
    }
  }
</script>