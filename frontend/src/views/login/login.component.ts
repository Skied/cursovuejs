import {Component, Vue} from 'vue-property-decorator';
import {ValidationObserver} from 'vee-validate';
import {LoginDto} from '@/dtos/login.dto';

@Component({
  components: {
    ValidationObserver: ValidationObserver,
  },
})
export default class LoginComponent extends Vue {

  public loginDto: LoginDto = new LoginDto();

  public async submit() {

  }

}
