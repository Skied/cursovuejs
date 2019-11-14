import {Component, Vue} from 'vue-property-decorator';
import {ValidationObserver} from 'vee-validate';
import { authService } from '../../services/auth.service';
import { User } from '@/classes/user';
import router from '@/router';

@Component({
  components: {
    ValidationObserver: ValidationObserver,
  },
})
export default class RegisterComponent extends Vue {

  public user = new User(); 
  public repeatPassword: string = '';
  public acceptTerms: boolean = false;

  public errorText: string = '';

  public async submit() {
    authService.register(this.user).then(
      () => router.push('login')
    ).catch(err => {
      this.user = new User();
      this.repeatPassword = '';
      this.acceptTerms = false;
      this.errorText = err.data.message;
    });
  }
}
