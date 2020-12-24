<?php



use Doctrine\ORM\Mapping as ORM;

/**
 * LigneCommande
 *
 * @ORM\Table(name="LIGNE_COMMANDE", indexes={@ORM\Index(name="LIGNE_COMMANDE_COMMANDE_FK", columns={"idCommande"}), @ORM\Index(name="LIGNE_COMMANDE_MAILLOT0_FK", columns={"idMaillot"})})
 * @ORM\Entity
 */
class LigneCommande
{
    /**
     * @var int
     *
     * @ORM\Column(name="idLigneCommande", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $idlignecommande;

    /**
     * @var int
     *
     * @ORM\Column(name="quantite", type="integer", nullable=false)
     */
    private $quantite;

    /**
     * @var \Commande
     *
     * @ORM\ManyToOne(targetEntity="Commande")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="idCommande", referencedColumnName="idCommande")
     * })
     */
    private $idcommande;

    /**
     * @var \Maillot
     *
     * @ORM\ManyToOne(targetEntity="Maillot")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="idMaillot", referencedColumnName="idMaillot")
     * })
     */
    private $idmaillot;


    /**
     * Get idlignecommande.
     *
     * @return int
     */
    public function getIdlignecommande()
    {
        return $this->idlignecommande;
    }

    /**
     * Set quantite.
     *
     * @param int $quantite
     *
     * @return LigneCommande
     */
    public function setQuantite($quantite)
    {
        $this->quantite = $quantite;

        return $this;
    }

    /**
     * Get quantite.
     *
     * @return int
     */
    public function getQuantite()
    {
        return $this->quantite;
    }

    /**
     * Set idcommande.
     *
     * @param \Commande|null $idcommande
     *
     * @return LigneCommande
     */
    public function setIdcommande(\Commande $idcommande = null)
    {
        $this->idcommande = $idcommande;

        return $this;
    }

    /**
     * Get idcommande.
     *
     * @return \Commande|null
     */
    public function getIdcommande()
    {
        return $this->idcommande;
    }

    /**
     * Set idmaillot.
     *
     * @param \Maillot|null $idmaillot
     *
     * @return LigneCommande
     */
    public function setIdmaillot(\Maillot $idmaillot = null)
    {
        $this->idmaillot = $idmaillot;

        return $this;
    }

    /**
     * Get idmaillot.
     *
     * @return \Maillot|null
     */
    public function getIdmaillot()
    {
        return $this->idmaillot;
    }
}
