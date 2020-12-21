<?php



use Doctrine\ORM\Mapping as ORM;

/**
 * Commande
 *
 * @ORM\Table(name="COMMANDE", indexes={@ORM\Index(name="COMMANDE_CLIENT_FK", columns={"idClient"})})
 * @ORM\Entity
 */
class Commande
{
    /**
     * @var int
     *
     * @ORM\Column(name="idCommande", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $idcommande;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="dateCommande", type="date", nullable=false)
     */
    private $datecommande;

    /**
     * @var float
     *
     * @ORM\Column(name="total", type="float", precision=10, scale=0, nullable=false)
     */
    private $total;

    /**
     * @var \Client
     *
     * @ORM\ManyToOne(targetEntity="Client")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="idClient", referencedColumnName="idClient")
     * })
     */
    private $idclient;

    /**
     * @var \Doctrine\Common\Collections\Collection
     *
     * @ORM\ManyToMany(targetEntity="Maillot", mappedBy="idcommande")
     */
    private $id;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->id = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * Get idcommande.
     *
     * @return int
     */
    public function getIdcommande()
    {
        return $this->idcommande;
    }

    /**
     * Set datecommande.
     *
     * @param \DateTime $datecommande
     *
     * @return Commande
     */
    public function setDatecommande($datecommande)
    {
        $this->datecommande = $datecommande;

        return $this;
    }

    /**
     * Get datecommande.
     *
     * @return \DateTime
     */
    public function getDatecommande()
    {
        return $this->datecommande;
    }

    /**
     * Set total.
     *
     * @param float $total
     *
     * @return Commande
     */
    public function setTotal($total)
    {
        $this->total = $total;

        return $this;
    }

    /**
     * Get total.
     *
     * @return float
     */
    public function getTotal()
    {
        return $this->total;
    }

    /**
     * Set idclient.
     *
     * @param \Client|null $idclient
     *
     * @return Commande
     */
    public function setIdclient(\Client $idclient = null)
    {
        $this->idclient = $idclient;

        return $this;
    }

    /**
     * Get idclient.
     *
     * @return \Client|null
     */
    public function getIdclient()
    {
        return $this->idclient;
    }

    /**
     * Add id.
     *
     * @param \Maillot $id
     *
     * @return Commande
     */
    public function addId(\Maillot $id)
    {
        $this->id[] = $id;

        return $this;
    }

    /**
     * Remove id.
     *
     * @param \Maillot $id
     *
     * @return boolean TRUE if this collection contained the specified element, FALSE otherwise.
     */
    public function removeId(\Maillot $id)
    {
        return $this->id->removeElement($id);
    }

    /**
     * Get id.
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getId()
    {
        return $this->id;
    }
}
