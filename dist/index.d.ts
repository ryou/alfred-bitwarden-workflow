/**
 * Alfredに引き渡すべきオブジェクト
 * alfy.outputにこの配列を渡す必要がある
 */
interface AlfredItem {
    title: string;
    subtitle: string;
    arg: string;
}
/**
 * itemsのnameにinputを含むデータのみ抽出し、alfredに渡す形式に変換し返却
 *
 * @param items
 * @param input
 */
export declare const convertAndFilterItems: (items: any[], input: string) => AlfredItem[];
export {};
