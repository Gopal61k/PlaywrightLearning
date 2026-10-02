import{Page,Locator,expect,Dialog} from '@playwright/test'
export class LoginPage{

    //Define properties

    private readonly page:Page;
    private readonly loginLink:Locator;
    private readonly usernameInput:Locator;
    private readonly passwordInput:Locator;
    private readonly loginButton:Locator;


    //initialize page context and elements
    constructor(page:Page)
    {
         this.page=page;
         this.loginLink=this.page.locator('#login2')
         this.usernameInput=this.page.locator('#loginusername')
         this.passwordInput=this.page.locator('#loginpassword')
         this.loginButton=this.page.locator(`//button[contains(text(),'Log in')]`)
    }

    //create reusable user actions
    //navigation
    async navigateTOLogin()
    {
        await this.loginLink.click()
    }

    //verification methods

    async verifyLoginLinkVisible()
    {
        await expect(this.loginLink).toBeVisible()
    }
    async verifyLoginButtonLinkEnabled()
    {
        await expect(this.loginButton).toBeEnabled()
    }

    //Input methods
    async fillUsername(username:string)
    {
        await this.usernameInput.clear()
        await this.usernameInput.fill(username)
    }

    async fillPassword(password:string)
    {
        await this.passwordInput.clear()
        await this.passwordInput.fill(password)
    }

    //action methods
    async subminLogin()
    {
        await this.loginButton.click()
    }

    //composite methods
    async login(username:string,password:string)
    {
        await this.fillUsername(username)
        await this.fillPassword(password)
        let loginAlertMessage: string | undefined
        const handleLoginDialog = async (dialog: Dialog) => {
            loginAlertMessage = dialog.message()
            await dialog.accept()
        }
        this.page.on('dialog', handleLoginDialog)

        try {
            await this.subminLogin()
            await expect(this.page.locator('#nameofuser')).toContainText(username)
            await expect(this.page.locator('#logInModal')).toBeHidden()
        } catch (error) {
            if (loginAlertMessage) {
                throw new Error(`Login was rejected: ${loginAlertMessage}`)
            }
            throw error
        } finally {
            this.page.off('dialog', handleLoginDialog)
        }
     }

    //Helper methods
    async getUsernamevalue():Promise<string>{
        return await this.usernameInput.inputValue()
    }
    async getPasswordValue():Promise<string>{
        return await this.passwordInput.inputValue()
    }
}