# enum.js
JavaScript enum library inspired by java enums

# The basic usage

```js
class Color extends Enum {
    static RED = new Color();
    static GREEN = new Color();
    static BLUE = new Color();
}
Color.freeze();

console.log(Color.values()); // Color.RED, Color.GREEN, Color.BLUE
console.log(Color.GREEN instanceof Color); // true
console.log(Color.GREEN.name); // GREEN
console.log(Color.GREEN.ordinal); // 1
console.log(Color.valueOf('RED') === Color.RED); // true


new Color(); // Error: Enum classes can’t be instantiated after freeze.
```

# The advanced usage

```js
class SideEnum extends Enum {
    constructor(isRight) {
        super();
        this.right = isRight;
    }

    isRight() {
        return this.right;
    }

    isLeft() {
        return !this.right;
    }

    static valueBy = function (isRight) {
        return isRight ? SideEnum.RIGHT : SideEnum.LEFT;
    }

    static LEFT = new SideEnum(false);
    static RIGHT = new SideEnum(true);
}
SideEnum.freeze();

```