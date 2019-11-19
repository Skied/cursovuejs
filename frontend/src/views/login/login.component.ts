import {Component, Vue} from 'vue-property-decorator';
import {ValidationObserver} from 'vee-validate';
import {LoginDto} from '@/dtos/login.dto';
import {authService} from '@/services/auth.service';
import {AxiosResponse} from 'axios';
import {AccessTokenDto} from '@/dtos/access-token.dto';
import {ErrorResponseDto} from '@/dtos/error-response.dto';
import { User } from '@/classes/user';
import jwt_decode from 'jwt-decode';
import {Mutation, Action} from 'vuex-class';


@Component({
  components: {
    ValidationObserver: ValidationObserver,
  },
})
export default class LoginComponent extends Vue {

  @Mutation('setUser') private setUser!: (user: User) => void;
  @Action('getAllData') private getAllData!: () => void;

  public loginDto: LoginDto = new LoginDto();
  
  public async submit() {
    authService.login(this.loginDto).then((response: AxiosResponse<AccessTokenDto | ErrorResponseDto>) => {
      if (response.status === 201) {
        const accessTokenDto: AccessTokenDto = response.data as AccessTokenDto;
        localStorage.setItem('token', accessTokenDto.accessToken);
        const user: User = jwt_decode(localStorage.getItem('token')!);
        this.setUser(user);
        this.getAllData();
        this.$router.push('/');
      } else {
        const errorResponseDto: ErrorResponseDto = response.data as ErrorResponseDto;
        this.$notify({
          text: errorResponseDto.message,
          duration: 3000,
          type: 'error',
        });
        this.loginDto.username = '';
        this.loginDto.password = '';
        requestAnimationFrame(() => {
          (this.$refs.loginForm as any).reset();
        });
      }
    });
  }

}
