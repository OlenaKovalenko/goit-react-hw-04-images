import { Circles } from "react-loader-spinner";
import { LoaderDiv } from "./Loader.styled";

export const Loader = () => {
    return (
        <LoaderDiv>
            <Circles
            marginLeft="auto"
            marginRight="auto"
            height="320"
            width="320"
            color="#303f9f"
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            />
        </LoaderDiv>
    )
}