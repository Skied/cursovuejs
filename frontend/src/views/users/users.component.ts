import {Component, Vue} from 'vue-property-decorator';
import {ValidationObserver} from 'vee-validate';

@Component({
  components: {
    ValidationObserver: ValidationObserver,
  },
})
export default class UsersComponent extends Vue {


}
