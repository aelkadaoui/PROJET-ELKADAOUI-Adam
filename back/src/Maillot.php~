<?php



use Doctrine\ORM\Mapping as ORM;

/**
 * Maillot
 *
 * @ORM\Table(name="MAILLOT", indexes={@ORM\Index(name="MAILLOT_EQUIPE0_FK", columns={"idEquipe"}), @ORM\Index(name="MAILLOT_MARQUE_FK", columns={"idMarque"})})
 * @ORM\Entity
 */
class Maillot
{
    /**
     * @var int
     *
     * @ORM\Column(name="idMaillot", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $idmaillot;

    /**
     * @var string
     *
     * @ORM\Column(name="nom", type="string", length=256, nullable=false)
     */
    private $nom;

    /**
     * @var string
     *
     * @ORM\Column(name="type", type="string", length=256, nullable=false)
     */
    private $type;

    /**
     * @var string
     *
     * @ORM\Column(name="saison", type="string", length=256, nullable=false)
     */
    private $saison;

    /**
     * @var string
     *
     * @ORM\Column(name="image", type="string", length=256, nullable=false)
     */
    private $image;

    /**
     * @var float
     *
     * @ORM\Column(name="prix", type="float", precision=10, scale=0, nullable=false)
     */
    private $prix;

    /**
     * @var int
     *
     * @ORM\Column(name="stock", type="integer", nullable=false)
     */
    private $stock;

    /**
     * @var \Equipe
     *
     * @ORM\ManyToOne(targetEntity="Equipe")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="idEquipe", referencedColumnName="idEquipe")
     * })
     */
    private $idequipe;

    /**
     * @var \Marque
     *
     * @ORM\ManyToOne(targetEntity="Marque")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="idMarque", referencedColumnName="idMarque")
     * })
     */
    private $idmarque;


    /**
     * Get idmaillot.
     *
     * @return int
     */
    public function getIdmaillot()
    {
        return $this->idmaillot;
    }

    /**
     * Set nom.
     *
     * @param string $nom
     *
     * @return Maillot
     */
    public function setNom($nom)
    {
        $this->nom = $nom;

        return $this;
    }

    /**
     * Get nom.
     *
     * @return string
     */
    public function getNom()
    {
        return $this->nom;
    }

    /**
     * Set type.
     *
     * @param string $type
     *
     * @return Maillot
     */
    public function setType($type)
    {
        $this->type = $type;

        return $this;
    }

    /**
     * Get type.
     *
     * @return string
     */
    public function getType()
    {
        return $this->type;
    }

    /**
     * Set saison.
     *
     * @param string $saison
     *
     * @return Maillot
     */
    public function setSaison($saison)
    {
        $this->saison = $saison;

        return $this;
    }

    /**
     * Get saison.
     *
     * @return string
     */
    public function getSaison()
    {
        return $this->saison;
    }

    /**
     * Set image.
     *
     * @param string $image
     *
     * @return Maillot
     */
    public function setImage($image)
    {
        $this->image = $image;

        return $this;
    }

    /**
     * Get image.
     *
     * @return string
     */
    public function getImage()
    {
        return $this->image;
    }

    /**
     * Set prix.
     *
     * @param float $prix
     *
     * @return Maillot
     */
    public function setPrix($prix)
    {
        $this->prix = $prix;

        return $this;
    }

    /**
     * Get prix.
     *
     * @return float
     */
    public function getPrix()
    {
        return $this->prix;
    }

    /**
     * Set stock.
     *
     * @param int $stock
     *
     * @return Maillot
     */
    public function setStock($stock)
    {
        $this->stock = $stock;

        return $this;
    }

    /**
     * Get stock.
     *
     * @return int
     */
    public function getStock()
    {
        return $this->stock;
    }

    /**
     * Set idequipe.
     *
     * @param \Equipe|null $idequipe
     *
     * @return Maillot
     */
    public function setIdequipe(\Equipe $idequipe = null)
    {
        $this->idequipe = $idequipe;

        return $this;
    }

    /**
     * Get idequipe.
     *
     * @return \Equipe|null
     */
    public function getIdequipe()
    {
        return $this->idequipe;
    }

    /**
     * Set idmarque.
     *
     * @param \Marque|null $idmarque
     *
     * @return Maillot
     */
    public function setIdmarque(\Marque $idmarque = null)
    {
        $this->idmarque = $idmarque;

        return $this;
    }

    /**
     * Get idmarque.
     *
     * @return \Marque|null
     */
    public function getIdmarque()
    {
        return $this->idmarque;
    }
}
