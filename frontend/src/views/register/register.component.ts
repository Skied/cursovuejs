import {Component, Vue} from 'vue-property-decorator';
import {ValidationObserver} from 'vee-validate';

@Component({
  components: {
    ValidationObserver: ValidationObserver,
  },
})
export default class RegisterComponent extends Vue {

  public name: string = '';
  public email: string = '';
  public username: string = '';
  public password: string = '';
  public repeatPassword: string = '';
  public acceptTerms: boolean = false;

  public async submit() {

  }

}
