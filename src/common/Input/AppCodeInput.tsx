import Input from './'

const AppCodeInput = () => {
    const handleInput = (e) => {
        (e.target as HTMLInputElement).value
    }

    return <Input type="text" onInput={handleInput} />
}

export default AppCodeInput