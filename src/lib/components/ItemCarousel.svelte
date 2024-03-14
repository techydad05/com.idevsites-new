<script>
    import { Slidy } from "@slidy/svelte";

    const slides = [
        {
            src: "volcano.png",
            id: 1,
            width: 800,
            height: 1200,
            text: "Sushi, Tapas, & More",
        },
        {
            src: "billiards.png",
            id: 2,
            width: 800,
            height: 1200,
            text: "Billiards Anyone?",
        },
        {
            src: "mimosa.png",
            id: 3,
            width: 800,
            height: 1200,
            text: "Brunch with Us",
        },
        {
            src: "tikis.png",
            id: 4,
            width: 800,
            height: 1200,
            text: "Potent Tikis and Cocktails",
        },
    ];
</script>

<Slidy {slides} />
