import {Component, Vue,Ref} from 'vue-property-decorator';
import {ValidationObserver} from 'vee-validate';
import {LoginDto} from '@/dtos/login.dto';

@Component({
  components: {
    ValidationObserver: ValidationObserver
  }
})
export default class LoginComponent extends Vue {

  @Ref('observer') readonly validation: ValidationObserver;

  public loginDto: LoginDto = new LoginDto();

  public async submit() {
    const isValid = await this.validation.validate();

  }

}
