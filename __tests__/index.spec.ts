/*
 * TODO: Jestのグローバルでエラー出さないためのコメント
 *  ちゃんと補完が効く形にするか、~.spec.tsのみglobalを設定するかとかで対応したい
 */
/* global describe, test, expect */
import { convertAndFilterItems } from '../src'

describe('convertAndFilterItems', () => {
    const items = [
        {
            name: 'WEBサービスHOGE',
            login: {
                username: 'sample1@example.com',
                password: '12345678',
            },
        },
        {
            name: 'WEBサービスFUGA',
            login: {
                username: 'sample2@example.com',
                password: 'abcdefg',
            },
        },
        {
            name: 'WEBサービスfoo',
            login: {
                username: 'sample3@example.com',
                password: 'qwertyui',
            },
        },
    ]

    test('小文字で検索してもヒットする', () => {
        const result = convertAndFilterItems(items, 'hoge')
        expect(result).toEqual([
            {
                title: 'WEBサービスHOGE',
                subtitle: 'sample1@example.com',
                arg: JSON.stringify({
                    username: 'sample1@example.com',
                    password: '12345678',
                }),
            },
        ])
    })

    test('複数件数ヒットする', () => {
        const result = convertAndFilterItems(items, 'g')
        expect(result).toEqual([
            {
                title: 'WEBサービスHOGE',
                subtitle: 'sample1@example.com',
                arg: JSON.stringify({
                    username: 'sample1@example.com',
                    password: '12345678',
                }),
            },
            {
                title: 'WEBサービスFUGA',
                subtitle: 'sample2@example.com',
                arg: JSON.stringify({
                    username: 'sample2@example.com',
                    password: 'abcdefg',
                }),
            },
        ])
    })
})
