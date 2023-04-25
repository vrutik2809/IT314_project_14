const sum = (a, b) => a + b

describe('Sample Test', () => {
    it('should test sum function', () => {
        expect(sum(2,3)).toBe(5)
    })
})