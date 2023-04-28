import Glide = require('../../glide');
import { Components } from '../../components';

type TransformerFunction = (
    Glide: Glide,
    Components: Components,
) => {
    modify(translate: number): number;
};

export default TransformerFunction;
