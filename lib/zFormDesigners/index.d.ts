
    import Vue, { VNode } from "vue";
    export declare class zFormDesigners extends Vue {
      static install(vue: typeof Vue): void;
      static setDefaultFormConfig(newFormConfig: {[x:string]:any}): void;
      static addFormRule(newRule: any[]): void;
      static addCompoentsRule(newRule:any[]): void;
    }
    